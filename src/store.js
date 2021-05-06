import { writable } from 'svelte/store'

// CONTROLS
export const showMenu = writable(false)
export const showCategories = writable(false)
export const showQuiz = writable(false)
export const activeCategory = writable(9)

export const score = writable(0)