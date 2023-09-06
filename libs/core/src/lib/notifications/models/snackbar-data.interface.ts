export interface ISnackBarData {
    message: string;
    closeKey: string;
    link: IEntityLink;
  }

  export interface IEntityLink {
    entityType: string;
    id: string;
  }
  