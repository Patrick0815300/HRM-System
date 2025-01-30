import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  uploadProgress: number | null = null;

  constructor(private firestore: Firestore, private readonly storage: Storage) { }


  getChannelRef(colId: string) {
    return collection(this.firestore, colId);
  }

  uploadFile(input: HTMLInputElement, employeeId: string) {
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file: File = input.files[0];
    const storageRef = ref(this.storage, `employee-profile-images/${employeeId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Fortschritt überwachen
    uploadTask.on('state_changed', {
      next: snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadProgress = progress;
      },
      error: (error) => {
        console.error('Upload-Fehler:', error);
      },
      complete: async () => {
        // Upload abgeschlossen -> Download-URL abrufen
        const url = await getDownloadURL(storageRef);
        console.log('Download-URL:', url);

        // Beispiel: Speichere die URL in Firestore 
        // (z. B. für den Employee mit der ID 'employee123')
        const docRef = doc(this.firestore, `employees/${employeeId}`);
        await updateDoc(docRef, {
          photoURL: url
        });

        // Upload-Fortschritt wieder zurücksetzen
        this.uploadProgress = null;

        // Optional: Input-Reset, damit nicht mehr dieselbe Datei angezeigt wird
        input.value = '';
      },
    });
  }
}
