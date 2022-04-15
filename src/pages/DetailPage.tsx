import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '../components/Tabs';

type Params = {
  id: string;
};

type Tab = 'about' | 'stats' | 'evolution';

const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>('about');

  const handleClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <h1>
      <Tabs tab={selectedTab} onClick={handleClick} />
    </h1>
  );
};

export default DetailPage;
