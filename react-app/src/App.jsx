import { useState } from 'react';
import Header from './components/Header';
import ReadingLevelSlider from './components/ReadingLevelSlider';
import Article from './components/Article';
import Sidebar from './components/Sidebar';
import SubscriptionModal from './components/SubscriptionModal';
import OffButton from './components/OffButton';

export default function App() {
  const [level, setLevel] = useState(0); // 0:원문 1:쉬운말 2:쉽게읽기 (원본 초기값과 동일)
  const [subOpen, setSubOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const openSub = () => setSubOpen(true);

  return (
    <>
      <Header onSubOpen={openSub} isPremium={isPremium} />

      <div className="page">
        <ReadingLevelSlider level={level} onChange={setLevel} />
        <Article level={level} onSubOpen={openSub} />
        <Sidebar onSubOpen={openSub} />
      </div>

      <SubscriptionModal
        open={subOpen}
        onClose={() => setSubOpen(false)}
        onSubscribed={() => setIsPremium(true)}
      />

      <OffButton />
    </>
  );
}
