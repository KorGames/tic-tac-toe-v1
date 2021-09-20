import firebase from 'firebase'

const getRoom = async (id: string) => {
  const snap = await firebase.firestore().collection('rooms').doc(id).get()
  return snap.data()!
}

export default getRoom
