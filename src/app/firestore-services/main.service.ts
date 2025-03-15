import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { supabase } from '../supabaseClient';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  uploadProgress: number | null = null;

  constructor(private firestore: Firestore, private readonly storage: Storage) { }


  getChannelRef(colId: string) {
    return collection(this.firestore, colId);
  }

  async uploadEmployeeImageFile(input: HTMLInputElement, employeeId: string) {
    if (!input.files || input.files.length === 0) { return; }
    const file: File = input.files[0];
    const storageRef = ref(this.storage, `employee-profile-images/${employeeId}/${file.name}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const docRef = doc(this.firestore, `employees/${employeeId}`);
    await updateDoc(docRef, { photoURL: url });

    input.value = '';
  }



  async getAllTables() {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) throw error;
    return data;
  }

}
