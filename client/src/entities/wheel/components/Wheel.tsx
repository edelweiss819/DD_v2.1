import React, {useEffect, useState} from 'react';
import {Stage, Layer, Arc, Text, Circle, Line} from 'react-konva';
import {truncateText} from '../../../shared/utils';
import {useNavigate} from 'react-router';
import Konva from 'konva';
import KonvaEventObject = Konva.KonvaEventObject;
import WheelLoader
    from '../../../shared/ui/Loaders/WheelLoader/WheelLoader.tsx';

export interface WheelProps {
    setWinningArticleIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    fetchedRandomArticles: { index: number; title: string }[];
}

const Wheel: React.FC<WheelProps> = ({
                                         setWinningArticleIndex,
                                         fetchedRandomArticles
                                     }) => {
    const [randomArticles, setRandomArticles] = useState<{
        index: number;
        title: string;
    }[]>([]);
    const [rotation, setRotation] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(fetchedRandomArticles)
        if (fetchedRandomArticles && fetchedRandomArticles.length > 0) {
            setRandomArticles(fetchedRandomArticles);

        }
    }, [fetchedRandomArticles]);

    if (randomArticles.length === 0) return <WheelLoader/>

    const radius = 350;
    const centerX = 400;
    const centerY = 400;
    const segmentAngle = (2 * Math.PI) / randomArticles.length;
    const textMargin = 50;

    const drawSegments = () => {
        return randomArticles.map((article, index) => {
            const startAngle = index * segmentAngle;
            const isEven = index % 2 === 0;
            const color = isEven ? '#12a4e2' : '#F4CC64';
            const angle = startAngle + segmentAngle / 2;

            const textX = centerX + Math.cos(angle + rotation * (Math.PI / 180)) * textMargin;
            const textY = centerY + Math.sin(angle + rotation * (Math.PI / 180)) * textMargin;

            return (
                <React.Fragment key={article.index}>
                    <Arc
                        x={centerX}
                        y={centerY}
                        innerRadius={0}
                        outerRadius={radius}
                        angle={segmentAngle * (180 / Math.PI)}
                        rotation={startAngle * (180 / Math.PI) + rotation}
                        fill={color}
                        onMouseEnter={(e: KonvaEventObject<MouseEvent>) => {
                            e.target.to({
                                            fill: '#00cc00',
                                            duration: 0.2
                                        });
                            document.body.style.cursor = 'pointer';
                        }}
                        onMouseLeave={(e: KonvaEventObject<MouseEvent>) => {
                            e.target.to({
                                            fill: color,
                                            duration: 0.2
                                        });
                            document.body.style.cursor = 'auto';
                        }}
                        onClick={() => {
                            console.log(`You tapped on ${article.title}`);
                            navigate(`/articles/${article.index}`);
                        }}
                    />
                    <Text
                        text={truncateText(article.title, 20)}
                        fontFamily={'Lora'}
                        fontSize={20}
                        fill={'#000000'}
                        align="center"
                        rotation={angle * (180 / Math.PI) + rotation}
                        x={textX}
                        y={textY}
                        offsetX={-50}
                        offsetY={10}
                    />
                </React.Fragment>
            );
        });
    };

    const drawStartButton = () => {
        return (
            <React.Fragment>
                <Circle
                    x={centerX}
                    y={centerY}
                    radius={40}
                    fill={'#F08080'}
                    onClick={startRotation}
                    onMouseEnter={() => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = 'auto';
                    }}
                />
                <Text
                    x={centerX - 35}
                    y={centerY - 8}
                    text="Крутить"
                    fontSize={18}
                    fontFamily={'Lora'}
                    fill="#000000"
                    onClick={startRotation}
                    onMouseEnter={() => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = 'auto';
                    }}
                />
            </React.Fragment>
        );
    };

    const drawTriangle = () => {
        return (
            <Line
                x={765}
                y={370}
                points={[
                    0,
                    0,
                    50,
                    0,
                    25,
                    43.3
                ]}
                closed={true}
                fill={'#001F3F'}
                strokeWidth={2}
                rotation={90}
            />
        );
    };

    const startRotation = () => {
        // Animation speed
        const fixedSpeed = (360 / 5) * 5;
        //Animation turns
        const minTurns = 1;
        const maxTurns = 3;
        // Calculate turns
        const randomTurns = Math.random() * (maxTurns - minTurns + 1) + minTurns;
        const totalRotation = 360 * randomTurns;

        let startTime: number | undefined;

        const easeOut = (t: number) => {
            return 1 - Math.pow(1 - t, 3);
        };

        const animate = (time: number) => {
            if (!startTime) startTime = time;

            const elapsedTime = time - startTime;
            const progress = Math.min(elapsedTime / (totalRotation / fixedSpeed * 1000), 1);
            const easingFactor = easeOut(progress);
            const currentRotation = totalRotation * easingFactor;
            setRotation(currentRotation % 360);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                const finalRotation = totalRotation % 360;
                setRotation(finalRotation);
                determineSegment(finalRotation);
            }
        };

        requestAnimationFrame(animate);
    };

    const determineSegment = (finalRotation: number) => {
        const triangleFixedAngle = 0;
        const adjustedRotation = (triangleFixedAngle - finalRotation + 360) % 360;
        const segmentAngleDegrees = (segmentAngle * (180 / Math.PI));
        const segmentIndex = Math.floor(adjustedRotation / segmentAngleDegrees);
        if (segmentIndex >= 0 && segmentIndex < randomArticles.length) {
            const article = randomArticles[segmentIndex];
            setWinningArticleIndex(article.index);
        } else {
            console.log('Нет сегмента под треугольником.');
        }
    };

    return (
        <Stage width={780} height={780}>
            <Layer>
                {drawSegments()}
                {drawStartButton()}
                {drawTriangle()}
            </Layer>
        </Stage>
    );
};

export default Wheel;
