export const pagination: ({
  data,
  maxItemsPerPage,
}: {
  data: any[];
  maxItemsPerPage?: number;
}) => { totalPage: number } = ({ data, maxItemsPerPage = 10 }) => {
  const totalPage = Math.ceil(data.length / maxItemsPerPage);
  return {
    totalPage,
  };
};
