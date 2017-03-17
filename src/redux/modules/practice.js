const START = 'extyping/pracitce/START';
const END = 'extyping/pracitce/END';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START:
    case END:
    default:
      return state;
  }
}
