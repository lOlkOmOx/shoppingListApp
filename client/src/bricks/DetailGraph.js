import React, {useState, useEffect} from "react";
import ReactECharts from 'echarts-for-react';
import { useTranslation } from './Translation';

function DetailGraph(props) {

    const { t } = useTranslation()
    const [solved, setSolved] = useState(0);
    const [unsolved, setUnsolved] = useState(0);

    useEffect(() => {
        let solvedCount = 0;
        let unsolvedCount = 0;

        for (let i = 0; i < props.items.length; i++) {
            if (props.items[i].required === true) {
                solvedCount++;
            } else if (props.items[i].required === false) {
                unsolvedCount++;
            }
        }

        setSolved(solvedCount);
        setUnsolved(unsolvedCount);

    }, [props.items]);

    const option = {
        title: {
            text: t.graphH,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
            {
                name: 'Info',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [
                    { value: solved, name: t.graphRequired, itemStyle: { color: '#a83232' }  },
                    { value: unsolved, name: t.graphBought, itemStyle: { color: '#20781c' }  },
                ],
                label: {
                    color: 'gray'
                  },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
        
    return(
        <div>
            <ReactECharts option={option} style={{ height: '400px' }} />
            
        </div>
    )
}

export default DetailGraph