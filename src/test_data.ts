import {App, FigureType, PresentationMode, TypeElement} from './Types'

const app: App = {
	presentation: {
		presentation_name: 'Fisrt present',
		active_slide: 0,
		slide_list: [
			{
				backgrond: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						size: {
							h: 100,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						background_color: 'ffffff',
						data:{
							type: TypeElement.Text,
							text: 'nyaharo',
							text_color: '000000',
							font: 'Arial',
							font_size: 30,
						},
					},
					{
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 100,
						},
						background_color: 'ffffff',
						data:{
							type: TypeElement.Image,
							src: 'https://static.wikia.nocookie.net/virtualyoutuber/images/b/b3/Sakura_Miko_2020_Alt_Portrait.png/revision/latest?cb=20210802134339',
						},
					},
				],
				active_elements: [],
			},
			{
				backgrond: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						background_color: 'ffffff',
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							figure_type: FigureType.Circle
						},
					},
					{
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						background_color: 'ffffff',
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							figure_type: FigureType.Rectangle
						},
					},
					{
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						background_color: 'ffffff',
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							figure_type: FigureType.Triangle
						},
					},
				],
				active_elements: [],
			},
		],
		select_slides:[0],
	},
	command_history: {},
	mode: PresentationMode.Edit,
}