import { Chart, ChartItem } from 'chart.js';

const chart_data_template = {
	labels: [],
	datasets: [
		{
			label: 'X',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [],
		},
		{
			label: 'Y',
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: [],
		},
		{
			label: 'Z',
			backgroundColor: 'rgb(255, 206, 86)',
			borderColor: 'rgb(255, 206, 86)',
			data: [],
		},
	]
}


export const create_accelo_chart = (ctx: ChartItem) => new Chart(ctx, {
	type: 'line',
	data: chart_data_template,
	options: {
		responsive: true,
		plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Accelerometer Data'
		}
		}
	},
})

export const create_gyro_chart = (ctx: ChartItem) => new Chart(ctx, {
	type: 'line',
	data: chart_data_template,
	options: {
		responsive: true,
		plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Gyroscope Data'
		}
		}
	},
});

export const create_magneto_chart = (ctx: ChartItem) => new Chart(ctx, {
	type: 'line',
	data: chart_data_template,
	options: {
		responsive: true,
		plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Magnetometer Data'
		}
		}
	},
});
