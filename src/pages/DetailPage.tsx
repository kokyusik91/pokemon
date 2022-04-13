import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};
const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  return <h1>deatil Page : {id}</h1>;
};

export default DetailPage;
