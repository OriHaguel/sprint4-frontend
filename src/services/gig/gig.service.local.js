import { storageService } from '../async-storage.service'
import { makeId, makeLorem, getRandomIntInclusive, loadFromStorage, saveToStorage, getRandomSentence, categories, makeUserNameLorem } from '../util.service'

import { userService } from '../user'

const STORAGE_KEY = 'gig'
_createGigs()
export const gigService = {
	query,
	getById,
	save,
	remove,
	getFilterFromSearchParams,
}
window.cs = gigService

async function query(filterBy = { txt: '', price: 0 }) {
	var gigs = await storageService.query(STORAGE_KEY)
	const { txt, daysToMake, price, sortField, sortDir, category } = filterBy

	if (txt) {
		// const regex = new RegExp(filterBy.txt, 'i')
		const regex = new RegExp(filterBy.txt.split(' ').join('|'), 'i')
		gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
		console.log('🚀 ~ query ~ gigs:', gigs)
	}
	if (daysToMake) {

		if (daysToMake === 'day') {
			gigs = gigs.filter(gig => gig.daysToMake === 1)
		}
		if (daysToMake === '3days') {
			gigs = gigs.filter(gig => gig.daysToMake <= 3 && gig.daysToMake > 1)
		}
		if (daysToMake === '7days') {
			gigs = gigs.filter(gig => gig.daysToMake <= 7 && gig.daysToMake > 3)
		}
		if (daysToMake === 'anytime') {
			gigs = gigs.filter(gig => gig.daysToMake > 7)
		}
	}

	if (price) {
		if (price === 'low') {
			gigs = gigs.filter(gig => gig.price < 100)
		}
		if (price === 'mid') {
			gigs = gigs.filter(gig => gig.price > 100 && gig.price < 500)
		}
		if (price === 'high') {
			gigs = gigs.filter(gig => gig.price > 500)
		}
	}
	if (sortField === 'title' || sortField === 'owner') {
		gigs.sort((gig1, gig2) => gig1[sortField].localeCompare(gig2[sortField]) * +sortDir)
	}
	if (sortField === 'price' || sortField === 'daystomake') {
		gigs.sort((gig1, gig2) => (gig1[sortField] - gig2[sortField]) * +sortDir)
	}

	if (category && category !== 'ai' && category !== 'consulting') {
		// console.log("🚀 ~ query ~ category:", category.toString())
		// const sen = 'hello there buddy'
		// const yo = ['hererllo', 'hrewrwerewr', 'fgfdgdfgd', 'rewrwerwr', 'buddy']
		// const what = yo.filter(bro => sen.includes(bro))
		gigs = gigs.filter(gig => categories[category].some(word => gig.title.includes(word)))
		// console.log("🚀 ~ query ~ gigs:", gigs)
		// console.log("🚀 ~ categories:", categories[category])
	}
	gigs = gigs.map(({ _id, title, price, daystomake, owner }) => ({ _id, title, price, daystomake, owner }))
	return gigs
}

function getById(gigId) {
	return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
	// throw new Error('Nope')
	await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
	var savedGig
	if (gig._id) {
		const gigToSave = {
			_id: gig._id,
			price: gig.price,
			daystomake: gig.daystomake,
		}
		savedGig = await storageService.put(STORAGE_KEY, gigToSave)
	} else {
		const gigToSave = {
			title: gig.title,
			price: gig.price,
			daystomake: gig.daystomake,
			// Later, owner is set by the backend
			owner: userService.getLoggedinUser(),
			msgs: [],
		}
		savedGig = await storageService.post(STORAGE_KEY, gigToSave)
	}
	return savedGig
}

function _diffFilter() {
	return {
		title: '',
		price: 0,
		sortField: '',
		sortDir: '',
		txt: '',
		category: '',
	}
}

function getFilterFromSearchParams(searchParams) {
	const defaultFilter = _diffFilter()
	const filterBy = {}
	for (const field in defaultFilter) {
		filterBy[field] = searchParams.get(field) || ''
	}
	return filterBy
}

function _createGig() {
	const gig = { title: '', price: 0 }
	gig.title = getRandomSentence()
	gig.price = getRandomIntInclusive(15, 1000)
	gig._id = makeId('g')
	gig.daysToMake = getRandomIntInclusive(1, 14)
	// temp
	gig.owner = makeUserNameLorem()
	gig.ownerImage = getImg()
	gig.ownerRating = getRandomIntInclusive(1, 5)

	return gig
}

function _createGigs() {
	let gigs = loadFromStorage(STORAGE_KEY)
	if (!gigs || !gigs.length) {
		gigs = []
		for (var i = 0; i < 20; i++) {
			gigs.push(_createGig())
		}
		saveToStorage(STORAGE_KEY, gigs)
	}
}

function getImg() {
	return '../src/assets/img/profile_clean.png'
}

// async function addGigMsg(gigId, txt) {
//     // Later, this is all done by the backend
//     const gig = await getById(gigId)

//     const msg = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     gig.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, gig)

//     return msg
// }
