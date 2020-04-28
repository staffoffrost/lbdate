
export interface BannerAdder {
  rootFolder: string,
  isSeparateRow: boolean,
  bannerSets: {
    fileType: string,
    banner: string
  }[],
  excludedFiles: string[],
  excludedSubFolders: string[],
  includedSubFolders: string[],
}
