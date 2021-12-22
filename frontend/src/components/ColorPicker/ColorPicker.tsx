// @ts-ignore
import ColorPicker from 'rc-color-picker';
import s from './ColorPicker.module.scss';
import React from "react";

type CustomColorPickerProps = {
    colors?: { [color: string]: string };
    activeColor?: string;
    updateColor?: (color: string, customizationItem?: string) => void;
    customizationItem?: string
}

const CustomColorPicker = ({
                               colors,
                               activeColor,
                               updateColor,
                               customizationItem,
                           }: CustomColorPickerProps) => {
    if (customizationItem === 'navbar' && colors) {
        return (
          <div>
                <ul className={s.colorsList}>
                    {Object.entries(colors).map((color) => {
                        return (
                            <li
                                key={color[1]}
                                className={`${s.colorBox} ${activeColor === color[1] ? s.active : ''}`}
                                style={{ background: color[1] }}
                                onClick={() => updateColor ? updateColor(color[1]) : null}
                            />
                        );
                    })}
                    <ColorPicker
                        className={s.colorBox}
                        defaultColor="#333333"
                        onChange={(e: React.ChangeEvent & { color: string }) => updateColor ?  updateColor(e.color, customizationItem) : null}
                    />
                </ul>
            </div>
        );
    } else {
      return (
        <div>
            <ul className={s.colorsList}>
                {colors && Object.entries(colors).map((color) => {
                    return (
                        <li
                            key={color[1]}
                            className={`${s.colorBox} ${activeColor === color[0] ? s.active : ''}`}
                            style={{ background: color[1] }}
                            onClick={() => updateColor ? updateColor(color[0]) : null}
                        />
                    );
                })}
            </ul>
        </div>
      );
    }
};

export default CustomColorPicker;
