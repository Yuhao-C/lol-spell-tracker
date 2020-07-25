/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Input, Radio } from 'antd';
import ChampionCard from '../champion-card';
import { ParamsContext } from '../../context';

import './index.scss';

const ChampionSelect = () => {
  const { championInfoList } = useContext(ParamsContext);
  const championCategories = {
    所有英雄: 'all',
    战士: 'fighter',
    法师: 'mage',
    刺客: 'assassin',
    坦克: 'tank',
    射手: 'marksman',
    辅助: 'support',
  };
  const [searchValue, setSearchValue] = useState('');
  const [currentChampionCategory, setCurrentChampionCategory] = useState(championCategories.所有英雄);
  const [filteredChampions, setFilteredChampions] = useState(championInfoList);
  const obj = {};
  championInfoList.forEach((champion) => {
    obj[champion.heroId] = false;
  });

  const handleSearch = (e) => {
    const trimVal = e.target.value.trim();
    setSearchValue(trimVal);
  };

  const handleChampionCategoryChange = (e) => {
    setCurrentChampionCategory(e.target.value);
  };

  useEffect(() => {
    const getFilteredChampions = () => championInfoList.filter((champion) => (
      (champion.name.indexOf(searchValue) >= 0
        || champion.title.indexOf(searchValue) >= 0
        || champion.alias.indexOf(searchValue) >= 0)
      && (currentChampionCategory === championCategories.所有英雄
        || champion.roles.includes(currentChampionCategory))));

    setFilteredChampions(getFilteredChampions());
  }, [searchValue, currentChampionCategory]);

  return (
    <div className="champion-select">
      <div className="champion-select-header">
        <Input
          placeholder="输入英雄名称搜索"
          onChange={handleSearch}
          style={{ width: 200, marginRight: '20px' }}
        />
        <Radio.Group onChange={handleChampionCategoryChange} value={currentChampionCategory}>
          {Object
            .keys(championCategories)
            .map((category) => (
              <Radio
                key={category}
                value={championCategories[category]}
              >
                {category}
              </Radio>
            ))}
        </Radio.Group>
      </div>
      <div className="champion-select-body">
        {filteredChampions
          .map((champion) => (
            <ChampionCard
              key={champion.heroId}
              championId={champion.heroId}
            />
          ))}
      </div>
    </div>
  );
};

export default ChampionSelect;
