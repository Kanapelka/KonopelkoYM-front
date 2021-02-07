class LocalStorageService {
  static PutToStorage<TItem>(key: string, item: TItem): void {
    const serializedItem: string = JSON.stringify(item);
    localStorage.setItem(key, serializedItem);
  }

  static GetFromStorage<TItem>(key: string): TItem {
    const serializedItem = localStorage.getItem(key);
    return serializedItem === null ? null : JSON.parse(serializedItem);
  }

  static RemoveFromStorage(key: string): void {
    localStorage.removeItem(key);
  }

  static ClearStorage(): void {
    localStorage.clear();
  }
}

export default LocalStorageService;
