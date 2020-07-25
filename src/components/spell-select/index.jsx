/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from 'react';
import { CheckSquareFilled } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import { ParamsContext } from '../../context';
import ChampionCard from '../champion-card';
import SpellCard from '../spell-card';

import './index.scss';

const SpellSelect = () => {
  const {
    resetItem, summonerSpellsList, setItemSummonerSpells, items, currentItem, setPopoverVisibility,
  } = useContext(ParamsContext);

  const [selectedSpellIds, setSelectedSpellIds] = useState([]);

  const handleSpellSelect = (spellId) => {
    if (selectedSpellIds.includes(spellId)) {
      setSelectedSpellIds(
        selectedSpellIds.filter((selectedSpellId) => selectedSpellId !== spellId),
      );
    } else if (selectedSpellIds.length === 2) {
      message.destroy();
      message.warning('最多选择两个召唤师技能');
    } else {
      setSelectedSpellIds(selectedSpellIds.concat(spellId));
    }
  };

  const handleChangeChampion = () => {
    resetItem();
  };

  const getImageIcon = (spellId) => {
    if (selectedSpellIds.includes(spellId)) {
      return <CheckSquareFilled style={{ color: 'rgb(82, 196, 26)' }} />;
    }
    return null;
  };

  const handleConfirm = () => {
    if (selectedSpellIds.length === 2) {
      setItemSummonerSpells(selectedSpellIds);
    } else {
      message.destroy();
      message.warning('必须选择两个召唤师技能');
    }
  };

  return (
    <div className="spell-select">
      <div className="spell-select-champion">
        <div className="spell-select-champion-text">{`敌方${currentItem}为：`}</div>
        <ChampionCard championId={items[currentItem].championId} />
        <Button type="link" onClick={handleChangeChampion}>更改英雄</Button>
      </div>
      <div className="spell-select-spell-list">
        {summonerSpellsList.map((spell) => (
          <SpellCard
            key={spell.id}
            spell={spell}
            badge={getImageIcon(spell.id)}
            handleSpellSelect={handleSpellSelect}
          />
        ))}
      </div>
      <div className="spell-select-buttons">
        <Space size={10}>
          <Button onClick={() => setPopoverVisibility(false)}>取 消</Button>
          <Button type="primary" onClick={handleConfirm}>确 认</Button>
        </Space>

      </div>
    </div>
  );
};

export default SpellSelect;
