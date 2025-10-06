import "./App.scss";
import Carousel from "./components/Carousel/Carousel";
import Counter from "./components/Counter/Counter";
import Interval from "./components/Interval/Interval";
import { HISTORICAL_PERIODS } from "./constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TimePeriod } from "./types/types";
import { useScreenWidth } from "./hooks/useScreenWidth";

let timelineInstanceCounter = 0;

const App: React.FC<{ id?: string }> = ({ id }) => {
  const componentId = id || `timeline-${timelineInstanceCounter++}`;
  const dotsData: TimePeriod[] = HISTORICAL_PERIODS;
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer)
      setIsVisible(false)
    };
  }, [activeDot]);

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 480;

  const currentPeriod = HISTORICAL_PERIODS[activeDot];
  const anglesRef = useRef<number[]>([]);

  useEffect(() => {
    const totalDots = dotsData.length;
    anglesRef.current = dotsData.map((_, index) => (index * 360) / totalDots);
    updateDotsPosition();
  }, [isMobile]);

  useEffect(() => {
    if (isVisible && activeDot !== null) {
      const nameElement = contentRef.current[activeDot];
      if (nameElement) {
        const circleNameElement = nameElement.querySelector('.circle-name') as HTMLElement;
        if (circleNameElement) {
          gsap.fromTo(circleNameElement,
            {
              opacity: 0,
              x: -20
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out"
            }
          );
        }
      }
    }
  }, [isVisible, activeDot]);

  const updateDotsPosition = (targetIndex: number = activeDot): void => {
    const totalDots: number = dotsData.length;
    const radius: number = 265;

    const dots = document.querySelectorAll(`.circle-dot-${componentId}`);

    dots.forEach((dot, index) => {
      const targetAngle: number = ((index - targetIndex) * 360) / totalDots - 60;

      const currentAngle = anglesRef.current[index];

      let angleDiff = targetAngle - currentAngle;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const timeline = gsap.timeline();

      timeline.to(dot, {
        duration: 1,
        rotation: -targetAngle,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          const currentAngleProgress = currentAngle + angleDiff * progress;
          const currentRadian = (currentAngleProgress * Math.PI) / 180;

          const x = Math.cos(currentRadian) * radius;
          const y = Math.sin(currentRadian) * radius;

          gsap.set(dot, {
            x: x,
            y: y
          });
        },
        onComplete: function () {
          anglesRef.current[index] = targetAngle;
        }
      });

      gsap.to(dot, {
        duration: 0.5,
        scale: index === targetIndex ? 1.2 : 1,
        ease: "power2.out",
      });

      const nameElement = contentRef.current[index];
      if (nameElement) {
        gsap.to(nameElement, {
          rotation: targetAngle,
          ease: "power2.out",
        });
      }
    });
  };

  const handleDotClick = (index: number): void => {
    setActiveDot(index);
    updateDotsPosition(index);
  };

  const handleCircleMouseEnter = (index: number): void => {
    setHoveredDot(index);
  };

  const handleCircleMouseLeave = (): void => {
    setHoveredDot(null);
  };

  const nextPeriod = (): void => {
    const nextIndex = (activeDot + 1) % dotsData.length;
    setActiveDot(nextIndex);
    updateDotsPosition(nextIndex);
  };

  const prevPeriod = (): void => {
    const prevIndex = (activeDot - 1 + dotsData.length) % dotsData.length;
    setActiveDot(prevIndex);
    updateDotsPosition(prevIndex);
  };

  const setContentRef = (index: number) => (el: HTMLDivElement | null) => {
    contentRef.current[index] = el;
  };

  return (
    <>
      <div className="wrapper" data-timeline-id={componentId}>
        <div className="left-border"></div>
        <div className="right-border"></div>
        <div className="circle-center"></div>

        {!isMobile && (
          <div className="circle-dots" ref={circleRef}>
            {dotsData.map((data: TimePeriod, index: number) => (
              <div
                key={data.id}
                className={`circle-dot circle-dot-${componentId} ${index === activeDot || hoveredDot === index ? "active" : "circle-dot-black"}`}
                onClick={() => {
                  handleDotClick(index)
                }}
                onMouseEnter={() => handleCircleMouseEnter(index)}
                onMouseLeave={handleCircleMouseLeave}
              >
                <div className="circle-content" ref={setContentRef(index)}>
                  {(activeDot === index && isVisible) && (
                    <span
                      className="circle-name"
                    >
                      {data.name}
                    </span>
                  )}
                  {(hoveredDot === index || activeDot === index) && (
                    <div className="circle-number">
                      {index + 1}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}


        <div className="content">
          <span className="title">Исторические даты</span>
          <div className="title-line"></div>
          <Interval
            fromYear={currentPeriod.startYear.toString()}
            toYear={currentPeriod.endYear.toString()}
          />
          {isMobile &&
            <div className="period">
              <span>{currentPeriod.name}</span>
              <div className="mobile-line"></div>
            </div>}
          <div className="carousel">
            <Counter
              currentPeriod={(activeDot + 1).toString().padStart(2, '0')}
              allPeriods={dotsData.length.toString().padStart(2, '0')}
              onNext={nextPeriod}
              onPrev={prevPeriod}
            />
            {isMobile && <div className="mobile-dots">
              {dotsData.map((data: TimePeriod, index: number) => (
                <button
                  key={data.id}
                  className={`mobile-dot ${index === activeDot ? "mobile-dot-active" : ""}`}
                  onClick={() => {
                    console.log(data.name);

                    handleDotClick(index)
                  }
                  }
                />
              ))}
            </div>}
            <Carousel events={currentPeriod.events} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;