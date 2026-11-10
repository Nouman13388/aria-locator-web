export async function copyText(clipboard: Pick<Clipboard, "writeText"> | undefined, text: string) {
  try {
    await clipboard!.writeText(text);
    return true;
  } catch {
    return false;
  }
}
