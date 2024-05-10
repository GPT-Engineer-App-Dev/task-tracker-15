import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <Flex mb={4}>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        </Flex>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Text as={task.completed ? 's' : ''}>{task.text}</Text>
            <Flex>
              <Button onClick={() => toggleComplete(task.id)} colorScheme={task.completed ? 'pink' : 'green'} size="sm" mr={2}>
                {task.completed ? 'Undo' : 'Complete'}
              </Button>
              <Button onClick={() => deleteTask(task.id)} colorScheme="red" size="sm">Delete</Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;