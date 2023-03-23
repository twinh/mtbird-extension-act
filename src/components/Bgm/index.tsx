import {IComponentDefine, IComponentProps, IComponentInstanceForm} from '@mtbird/shared';
import React, {useState, useRef, useEffect} from 'react';
import manifest from "./manifest";
import styles from "./style.module.less";

const Bgm: IComponentDefine<IComponentInstanceForm> = ({node, style}: IComponentProps) => {
    const {props} = node;

    const ref = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    const play = () => {
        setPlaying(true);
        ref.current?.play();
    };

    const pause = () => {
        setPlaying(false);
        ref.current?.pause();
    };

    const handleClick = () => {
        if (!playing) {
            play();
        } else {
            pause();
        }
    };

    // 首次点击播放音频
    // TODO 忽略编辑模式
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            console.log('handleClickOutside');
            if (imgRef.current && !imgRef.current.contains(event.target as Node)) {
                play();
            }
        }

        document.addEventListener('mousedown', handleClickOutside, {once: true});
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [imgRef]);

    return (
        <div style={style}>
            <img
                ref={imgRef}
                className={styles.bgmControl}
                src={(playing ? props.playIcon : props.pauseIcon) as string}
                onClick={handleClick}
            />
            <audio ref={ref} hidden autoPlay preload="auto" loop src={props.src as string}/>
        </div>
    );
};

Bgm.manifest = manifest;

export default Bgm;