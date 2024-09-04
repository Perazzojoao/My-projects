import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	formContext: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		bottom: 0,
		backgroundColor: '#FFFFFF',
		paddingTop: 30,
		marginTop: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	form: {
		width: '100%',
		height: '100%',
	},
	formLabel: {
		color: '#000000',
		fontSize: 18,
		paddingLeft: 20,
	},
	input: {
		width: '90%',
		borderRadius: 50,
		backgroundColor: '#f6f6f6',
		height: 40,
		margin: 12,
		paddingLeft: 10,
	},
	btnCalculator: {
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
		backgroundColor: '#FF0043',
		paddingTop: 14,
		paddingBottom: 14,
		marginLeft: 12,
		marginTop: 30,
	},
	textBtnCalculator: {
		fontSize: 20,
		color: '#FFFFFF',
	},
	errorMessage: {
		fontSize: 12,
		color: 'red',
		fontWeight: 'bold',
		paddingLeft: 20,
	},
	exibirIMC: {
		width: '100%',
		height: '50%',
		display: 'flex',
		justifyContent: 'flex-start',
	},
})

export default styles
