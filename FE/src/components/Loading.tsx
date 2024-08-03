import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'

type Props = {}

const Loading = (props: Props) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let ptg = -10;

        const interval = setInterval(() => {
            ptg += 10;
            setPercent(ptg);

            if (ptg > 120) {
                clearInterval(interval);
                setPercent(0);
            }
        }, 100);
    }, [])
    return (
        <>
            <Spin indicator={<LoadingOutlined spin />} size="large" percent={percent} fullscreen />
        </>
    )
}

export default Loading