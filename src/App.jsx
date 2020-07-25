/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import {
  Button,
  Space,
  Popover,
} from 'antd';
import ChampionSelect from './components/champion-select';
import SpellSelect from './components/spell-select';
import { ParamsContext, ParamsProvider } from './context';

import './App.scss';

const App = () => {
  const { items, setCurrentItem, setPopoverVisibility } = useContext(ParamsContext);

  const getPopoverState = (item) => {
    if (item.championSelected && item.summonerSpellsSelected) {
      return 1;
    } if (item.championSelected) {
      return 2;
    }
    return 1;
  };

  const renderChampionChoice = (lane, state) => (
    <Popover
      key={lane}
      placement="bottomLeft"
      title={(
        <div className="popover-header">
          {state === 1 ? '选择英雄' : '选择召唤师技能'}
        </div>
      )}
      content={state === 1 ? (<ChampionSelect />) : (<SpellSelect />)}
      trigger="click"
      visible={items[lane].popoverVisible}
      onVisibleChange={(visible) => setPopoverVisibility(visible, lane)}
    >
      <Button
        shape="round"
        type="primary"
        onClick={() => setCurrentItem(lane)}
      >
        {lane}
      </Button>
    </Popover>
  );

  const renderSpellCounter = () => {

  };

  return (
    <div className="app">
      <Space size="large">
        {Object.entries(items).map(([key, value]) => {
          if (value
          && value.championSelected
           && value.summonerSpellsSelected) {
            console.log('renderSpellCounter');
            return renderSpellCounter(value.id, value.spells);
          }
          console.log('renderChampionChoice');
          return renderChampionChoice(key, getPopoverState(value));
        })}
      </Space>
    </div>

  );
};

export default (() => (
  <ParamsProvider>
    <App />
  </ParamsProvider>
));
