import * as React from 'react';
import { Bar } from 'react-chartjs-2';

import * as Colors from './colors';


class Chart extends React.Component<any, any> {
	render() {
		const { title, data, labels } = this.props;

		return (
			<div className="chart-item">
				<Bar data={{
					datasets: [{
						data: [...data, 1] || [],
						backgroundColor: Colors.colors,
						// backgroundColor: [
						// 	Colors.red,
						// 	Colors.orange,
						// 	Colors.yellow,
						// 	Colors.green,
						// 	Colors.blue,
						// 	Colors.purple,
						// ],
					}],
					labels: labels,
					// labels: [
					// 	'Менеджер продукту',
					// 	'Менеджер програми',
					// 	'Розробник',
					// 	'Тестер',
					// 	'Інструктор',
					// 	'Логістик',
					// ]
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
			</div>
		);
	}
}


export default Chart;