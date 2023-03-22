import {SchemaGenerator, COMPONENT} from "@mtbird/core";
import {IComponentManifest, IComponentInstanceForm} from "@mtbird/shared";

const manifest: IComponentManifest<IComponentInstanceForm> = {
    type: "component",
    componentName: "Bgm",
    title: "背景音乐",
    icon: "mtbird-mtbutton",
    desc: "",
    category: "basic",
    schema: [
        ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
        SchemaGenerator.collapsePanel(
            "背景音乐",
            [
                SchemaGenerator.upload("音乐地址", "props.src"),
                SchemaGenerator.upload('播放图标', 'props.playIcon'),
                SchemaGenerator.upload('暂停图标', 'props.pauseIcon'),
            ],
            true
        ),
    ],
    instance: {
        type: "component",
        componentName: "Bgm",
        props: {
            src: 'https://mtbird-cdn.staringos.com/161536131444-103511-42126-111147-1561321101211116414.mp3',
            playIcon: 'https://mtbird-cdn.staringos.com/3174014330-1421415-46613-13100-56002761174314.png',
            pauseIcon: 'https://mtbird-cdn.staringos.com/3110161611514-57617-451010-1211511-16716540113141652.png',
            style: {
                ...COMPONENT.COMPONENT_DEFAULT_STYLE,
                height: 50,
                width: 50,
            },
        },
        data: {

        },
    },
};

export default manifest;
