import * as React from 'react';
import { Bar } from 'react-chartjs-2';

import * as Colors from './colors';


export default class Chart extends React.Component<any, any> {
	render() {
		const { title, data } = this.props;

		return (
			<Bar data={{
				datasets: [{
					data: [...data, 1] || [
						1.0,
						0.9,
						0.9,
						0.9,
						0.9,
						0.9,
					],
					backgroundColor: [
						Colors.red,
						Colors.orange,
						Colors.yellow,
						Colors.green,
						Colors.blue,
						Colors.purple,
					],
				}],
				labels: [
					'Менеджер продукту',
					'Менеджер програми',
					'Розробник',
					'Тестер',
					'Інструктор',
					'Логістик',
				]
			}}
			options={{
				responsive: true,
				legend: {
					display: false,
				},
				title: {
					display: true,
					position: 'bottom',
					text: title,
					fontSize: 40,
				},
			    scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero:true
			            }
			        }],
			        xAxes: [{
			            ticks: {
			                beginAtZero:true
			            }
			        }],
			    }
			}}
			/>
		);
	}
}