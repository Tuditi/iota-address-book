import { writable } from 'svelte/store';
import type { IAddressEntry } from '../types/IAddressEntry';

export const addresses = writable<IAddressEntry[]>([]);
