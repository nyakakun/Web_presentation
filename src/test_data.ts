import {App, FigureType, PresentationMode, Presentation, TypeElement} from './Types'
import { v4 as uuidv4 } from 'uuid';

export var app: App = {
	presentation: {
		presentation_name: 'Fisrt present',
		slide_list: [
			{
				id: uuidv4(),
				background: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						id: uuidv4(),
						size: {
							h: 100,
							w: 300,
						},
						position: {
							x: 0,
							y: 50,
						},
						data:{
							type: TypeElement.Text,
							text: 'nyaharo',
							text_color: '000000',
							font: 'Arial',
							font_size: 30,
						},
					},
					{
						id: uuidv4(),
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 100,
						},
						data:{
							type: TypeElement.Image,
							src: 'https://static.wikia.nocookie.net/virtualyoutuber/images/b/b3/Sakura_Miko_2020_Alt_Portrait.png',
						},
					},
				],
				active_elements: [],
			},
			{
				id: uuidv4(),
				background: {
					src: '',
					color: '000000',
				},
				elements: [
					{
						id: uuidv4(),
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							background_color: 'ffffff',
							figure_type: FigureType.Circle
						},
					},
					{
						id: uuidv4(),
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							background_color: 'ffffff',
							figure_type: FigureType.Rectangle
						},
					},
					{
						id: uuidv4(),
						size: {
							h: 300,
							w: 300,
						},
						position: {
							x: 0,
							y: 0,
						},
						data:{
							type: TypeElement.Figure,
							border_color: '000000',
							border_size: 5,
							background_color: 'ffffff',
							figure_type: FigureType.Triangle
						},
					},
				],
				active_elements: [],
			},
		],
		select_slides:[0],
	},
	command_history: {
		history: [],
		Last: 0
	},
	mode: PresentationMode.Edit,
}