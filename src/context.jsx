/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import { message } from 'antd';
import axios from 'axios';

const championInfoUrl = 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js';
const championImageBaseUrl = 'https://game.gtimg.cn/images/lol/act/img/champion';
const summonerSpellsInfoUrl = 'http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/summoner.json';
const summonerSpellsImageBaseUrl = 'http://ossweb-img.qq.com/images/lol/img/spell';

const getChampionInfo = async () => {
  const response = await axios.get(championInfoUrl);
  const championData = response.data.hero;
  championData.forEach((champion) => {
    champion.imageUrl = `${championImageBaseUrl}/${champion.alias}.png`;
  });
  return championData;
};

const getSummonerSpellsInfo = async () => {
  const response = await axios.get(summonerSpellsInfoUrl);
  const summonerSpellsData = Object.values(response.data.data).filter((spell) => spell.modes.includes('CLASSIC'));
  summonerSpellsData.forEach((spell) => {
    spell.imageUrl = `${summonerSpellsImageBaseUrl}/${spell.image.full}`;
  });
  return summonerSpellsData;
};

// eslint-disable-next-line comma-spacing
const createParamsProvider = (getChampion, getSummonerSpells) => {
  const ParamsContext = createContext();
  const initialItemState = {
    championId: undefined,
    championSelected: false,
    summonerSpells: [undefined, undefined],
    summonerSpellsSelected: false,
    popoverVisible: false,
  };
  const ParamsProvider = (props) => {
    const [summonerSpellsList, setSummonerSpellsList] = useState();
    const [championInfoList, setChampionInfoList] = useState();
    const [currentItem, setCurrentItem] = useState();
    const [items, setItems] = useState({
      TOP: initialItemState,
      JUG: initialItemState,
      MID: initialItemState,
      BOT: initialItemState,
      SUP: initialItemState,
    });

    const resetItem = (itemName = currentItem) => {
      setItems({
        ...items,
        [itemName]: {
          ...initialItemState,
          popoverVisible: items[itemName].popoverVisible,
        },
      });
    };

    const setItemChampionId = (championId) => {
      setItems({
        ...items,
        [currentItem]: {
          ...items[currentItem],
          championId,
          championSelected: true,
        },
      });
    };

    const setItemSummonerSpells = (summonerSpells) => {
      setItems({
        ...items,
        [currentItem]: {
          ...items[currentItem],
          summonerSpells: [...summonerSpells],
          summonerSpellsSelected: true,
          popoverVisible: false,
        },
      });
    };

    const setPopoverVisibility = (visibility, itemName = currentItem) => {
      setItems({
        ...items,
        [itemName]: {
          ...items[itemName],
          popoverVisible: visibility,
        },
      });
    };

    useEffect(() => {
      getChampion()
        .then((response) => {
          console.log(response);
          setChampionInfoList(response);
        })
        .catch(() => {
          message.error('读取英雄数据时出现错误');
        });
      getSummonerSpells()
        .then((response) => {
          console.log(response);
          setSummonerSpellsList(response);
        })
        .catch(() => {
          message.error('读取召唤师技能数据时出现错误');
        });
    }, []);

    return (
      <ParamsContext.Provider value={{
        summonerSpellsList,
        championInfoList,
        currentItem,
        items,
        setItemChampionId,
        setItemSummonerSpells,
        resetItem,
        setCurrentItem,
        setPopoverVisibility,
      }}
      >
        {props.children}
      </ParamsContext.Provider>
    );
  };

  return {
    ParamsContext,
    ParamsProvider,
  };
};

const {
  ParamsContext,
  ParamsProvider,
} = createParamsProvider(getChampionInfo, getSummonerSpellsInfo);

export {
  ParamsContext,
  ParamsProvider,
};
