import { writable } from 'svelte/store';
import type { IAddressEntry } from '../../shared/IAddressEntry';

export const addresses = writable<IAddressEntry[]>([]);
