import {IComponentDefine, IComponentProps, IComponentInstanceForm} from '@mtbird/shared';
import React, {useState, useRef} from 'react';
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

    return (
        <div style={style}>
            <img
                className={styles.bgmControl}
                src={(playing ? props.playIcon : props.pauseIcon) as string}
                onClick={handleClick}
            />
            <audio ref={ref} hidden preload="auto" loop src={props.src as string}/>
        </div>
    );
};

Bgm.manifest = manifest;

export default Bgm;