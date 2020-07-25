/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { ParamsContext } from '../../context';
import './index.scss';

const ChampionCard = (props) => {
  const { setItemChampionId, championInfoList } = useContext(ParamsContext);
  const { championId } = props;
  const [loaded, setLoaded] = useState(false);
  const result = championInfoList.find(
    (champion) => championId === champion.heroId,
  );

  const handleChampionSelect = () => {
    setItemChampionId(result && result.heroId);
  };

  return (
    <div className="champion-card">
      <div className={loaded ? 'loaded-circle' : 'loading-circle'}>
        <img
          className="champion-card-img"
          src={result && result.imageUrl}
          onLoad={() => setLoaded(true)}
          onClick={handleChampionSelect}
        />
      </div>

      <div className="champion-card-text">{result && result.name}</div>
    </div>
  );
};

export default ChampionCard;
