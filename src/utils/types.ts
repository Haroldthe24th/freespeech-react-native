export default interface TileType {
  id: string;
  text: string;
  img: string;
}

export type Tile = {
  text: string;
  subpageIndex?: number;
  x?: number;
  y?: number;
  image?: string;
  folder?: string;
  color?: string;
  deleted?: boolean;
  invisible?: boolean;
};

export type Page = {
  name: string;
  tiles: Tile[];
};

export type Project = {
  name: string;
  columns: number;
  rows: number;
  pages: Page[];
};

export type EditModeTool =
  | "text"
  | "image"
  | "color"
  | "move"
  | "folder"
  | "template"
  | "delete";

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
} | null;
