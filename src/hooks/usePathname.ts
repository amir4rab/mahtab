import { signal } from "@preact/signals";

const pathnameSignal = signal<string>("/");
export default pathnameSignal;
