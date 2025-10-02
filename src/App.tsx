import "./App.scss";
import Carousel from "./components/Carousel/Carousel";
import Counter from "./components/Counter/Counter";
import Interval from "./components/Interval/Interval";
import { HISTORICAL_PERIODS } from "./constants";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TimePeriod } from "./types/types";

const App: React.FC = () => {
  const dotsData: TimePeriod[] = HISTORICAL_PERIODS;
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    updateDotsPosition();
  }, []);

  const updateDotsPosition = (targetIndex: number = activeDot): void => {
    const totalDots: number = dotsData.length;
    const radius: number = 265; // Радиус круга

    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      // Вычисляем угол для каждой точки
      const angle: number = ((index - targetIndex) * 360) / totalDots;
      const radian: number = (angle * Math.PI) / 180;

      const x: number = Math.cos(radian) * radius;
      const y: number = Math.sin(radian) * radius;

      // Определяем opacity в зависимости от состояния
      let opacity: number;
      if (isHovered) {
        // При наведении показываем только активную точку
        opacity = index === targetIndex ? 1 : 0.2;
      } else {
        // Без наведения показываем активную и остальные с пониженной прозрачностью
        opacity = index === targetIndex ? 1 : 0.2;
      }

      // Анимация перемещения
      gsap.to(dot, {
        duration: 0.5,
        x: x,
        y: y,
        rotation: -angle,
        scale: index === targetIndex ? 1.2 : 1,
        opacity: opacity,
        ease: "power2.out",
      });

      // Анимация для текста (названия периода)
      const nameElement: HTMLElement | null = dot.querySelector(".circle-name");
      if (nameElement) {
        gsap.to(nameElement, {
          duration: 0.8,
          opacity: index === targetIndex ? 1 : 0,
          x: index === targetIndex ? 80 : 0,
          ease: "power2.out",
        });
      }
    });
  };

  const handleDotClick = (index: number): void => {
    setActiveDot(index);
    updateDotsPosition(index);
  };

  const handleCircleMouseEnter = (): void => {
    setIsHovered(true);
    updateDotsPosition();
  };

  const handleCircleMouseLeave = (): void => {
    setIsHovered(false);
    updateDotsPosition();
  };

  const setDotRef = (index: number) => (el: HTMLDivElement | null) => {
    dotsRef.current[index] = el;
  };

  return (
    <div className="wrapper">
      <div className="left-border"></div>
      <div className="right-border"></div>
      <div className="circle-center"></div>

      <div className="circle-dots" ref={circleRef}>
        {dotsData.map((data: TimePeriod, index: number) => (
          <div
            key={data.id}
            ref={setDotRef(index)}
            className={`circle-dot ${
              index === activeDot ? "active" : "circle-dot-black"
            }`}
            onClick={() => handleDotClick(index)}
            onMouseEnter={handleCircleMouseEnter}
            onMouseLeave={handleCircleMouseLeave}
          >
            {activeDot === index && (
              <div>
                <span className="circle-name">{data.name}</span>
                {<div>{index + 1}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="content">
        <span className="title">Исторические даты</span>
        <div className="title-line"></div>
        <Interval fromYear="2015" toYear="2022" />
        <div className="carousel">
          <Counter />
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default App;
