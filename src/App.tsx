import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Counter from './components/Counter/Counter';
import Interval from './components/Interval/Interval';

const App = () => {
  const dotsData = [1, 2, 3, 4, 5, 6];

  return (
    <div className="wrapper">
      <div className="left-border"></div>
      <div className="right-border"></div>
      <div className="circle-center"></div>
      <div className="circle-dots">
        {dotsData.map((number, index) => (
          <div key={index} className="circle-dot">
            {number}
          </div>
        ))}
      </div>

      <div className="content">
        <span className='title'>Исторические даты</span>
        <Interval fromYear='2015' toYear='2022' />
        <div className='carousel'>
          <Counter />
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default App;