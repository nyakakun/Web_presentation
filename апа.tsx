
const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div>
            {
                menuSwitcher
                ? <ElementListTool foo={handleToggleView}/>
                : <ReorderListTool foo={handleToggleView}/>
            }
        </div>
    );
}

type ElementListToolProps = {
    foo: () => void | undefined
}

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    return <div>
        <Button text="Undo" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Redo" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button  text="Reorder" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Opacity" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Delete" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Fullscreen" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
    </div>;
}

export function VerticalLine(): JSX.Element {
    return (
        <div className={styles.vertical_line}></div>
    );
}

type ReorderListToolProps = {
    foo: () => void | undefined
}

export function ReorderListTool(props: ReorderListToolProps): JSX.Element {
    return <div>
        <Button text="Backward" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Back" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Forward" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Front" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
    </div>
}

type ButtonProps = {
    text: string,
    state: 'disabled' | 'active' | 'focused' | 'default',
    contentType: 'text' | 'icon' | 'leftSideIconAndTextInSubMenu' | 'rightSideIconAndTextInSubMenu' | 'rightSideHotKeyInfoAndTextInSubMenu' | 'textInSubMenu',
    content: {
        hotkeyInfo: string,
    } | undefined,
    foo: () => void | undefined
}

export function Button(props: ButtonProps = {
    text: '',
    state: 'disabled',
    contentType: 'text',
    content: undefined,
    foo: () => {},
}): JSX.Element {
    const { text, content, contentType, state, foo } = props;

    const onClickHandler = (_: BaseSyntheticEvent) => {
        if (foo !== undefined) {
            foo();
        }
    }

    const [buttonStyle, setButtonStyle] = useState(styles.default);

    useEffect(() => {
        if (state !== 'default') {
            const style = (contentType === 'icon')
                ? (state === 'disabled') ? styles.icon : (state === 'active') ? styles['icon-pressed'] : styles['icon-focused']
                :
                (contentType === 'leftSideIconAndTextInSubMenu')
                    ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                    :
                    (contentType === 'rightSideIconAndTextInSubMenu')
                        ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                        :
                        (contentType === 'rightSideHotKeyInfoAndTextInSubMenu')
                            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                            :
                            (contentType === 'textInSubMenu')
                                ? (state === 'disabled') ? styles['button-in-submenu'] : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                :
                                (contentType === 'text')
                                    ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                        : styles.button;
            setButtonStyle(style);
        }
    }, [state, contentType]);

    const [preventingMouseUp, setPreventMouseUpStatus] = useState(false);

    const onMouseDownHandler = (state === 'default')
        ? (_: BaseSyntheticEvent) => {
            setButtonStyle(styles['default-pressed']);
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
        }

    const onMouseUpHandler = (state === 'default')
        ? (event: BaseSyntheticEvent) => {
            setButtonStyle(styles.default);
            if (preventingMouseUp) {
                setPreventMouseUpStatus(false);
                event.target.blur();
            } else {
                setPreventMouseUpStatus(true);
            }
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
        }

    const button: JSX.Element =
        <button
            className={buttonStyle}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onClickHandler}
        >
            {text}
            {(content !== undefined)
                ?   <div className="hotkey-info">
                        {content.hotkeyInfo}
                    </div>
                : ''
            }
        </button>;

    return button;
}



export default App;