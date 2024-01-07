import React, {useState, useEffect} from "react";
import ReactECharts from 'echarts-for-react';
import { useTranslation } from './Translation';
import {Col, Row, Container} from 'react-bootstrap'

function ListGraph(props) {

    const { t } = useTranslation()

    const [names, setNames] = useState();
    const [counts, setCounts] = useState();
    const [solved, setSolved] = useState(0);
    const [unsolved, setUnsolved] = useState(0);

    useEffect(() => {
        let names = [];
        let counts = [];
        let solvedCount = 0;
        let unsolvedCount = 0;
        for (let i = 0; i < props.lists.length; i++) {
            if (props.lists[i].ownerId === props.user.toString() && props.lists[i].archived === false) {
                names.push(props.lists[i].name);
                counts.push(props.lists[i].items.length)
                for(let j = 0; j < props.lists[i].items.length; j++) {
                  if (props.lists[i].items[j].required === true) {
                    unsolvedCount++;
                  } else if (props.lists[i].items[j].required === false) {
                    solvedCount++;
                  }
                }
            } else if (props.lists[i].usersIds.some(id => id === props.user.toString()) && props.lists[i].archived === false) {
                names.push(props.lists[i].name);
                counts.push(props.lists[i].items.length)
                for(let j = 0; j < props.lists[i].items.length; j++) {
                  if (props.lists[i].items[j].required === true) {
                    unsolvedCount++;
                  } else if (props.lists[i].items[j].required === false) {
                    solvedCount++;
                  }
                }
            } 
          }
        setSolved(solvedCount);
        setUnsolved(unsolvedCount);
        setNames(names);
        setCounts(counts);
    }, [props.user, props.lists]);



    const option = {
      title: {
        text: t.graf2h1,
        left: 'center',
    },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: names,
            axisTick: {
              alignWithLabel: true
            }
          } 
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: t.graf2,
            type: 'bar',
            barWidth: '50%',
            data: counts,
            itemStyle: {
                color: '#20781c'
              }
          }
        ]
      };
      const option2 = {
        title: {
            text: t.graf3h1,
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
                    { value: solved, name: t.graphBought, itemStyle: { color: '#20781c' }  },
                    { value: unsolved, name: t.graphRequired, itemStyle: { color: '#a83232' }  },
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
        <div className="csscontainer2">
          <h1 style={{textAlign:"start", padding: "10px 0 0 10px"}}>{t.stats}</h1>
            <Container fluid>
              <Row>
              <Col lg={9} ><ReactECharts option={option}/></Col>
              <Col lg={3} xs={12} sm={12} md={12}><ReactECharts option={option2}/></Col>
            </Row>
            </Container>
        </div>
    )
}

export default ListGraph