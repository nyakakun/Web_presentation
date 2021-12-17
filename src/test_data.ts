import {App, FigureType, PresentationMode, TypeElement} from './Types'

export var app: App = {
	presentation: {
		presentation_name: 'Fisrt present',
		slide_list: [
			{
				id: '28df1b3e-0645-496c-a3a6-07ff532d946f',
				background: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						id: '6313569c-1160-4c52-9926-7831fb2da170',
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
						id: 'ace86495-8c37-44c2-8e08-eb542b8bcdf8',
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
				id: '6a4798bb-1b96-4ce3-a9f3-a6047e4ce20f',
				background: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						id: '69743c0a-db93-45b7-83ce-3baaed9ff3e2',
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
						id: '936cc66f-ee06-4d65-b663-2847a898df21',
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
						id: '9c7d7352-99cd-4f43-be28-1515cdd9dc60',
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