interface IGqlError {
  res: Response;
  body: {
    data: any;
    errors: any[];
  };
}