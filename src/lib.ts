interface Todo {
  name: string;
}

export const todo = (): Todo => {
  return { name: 'TODO' };
};
