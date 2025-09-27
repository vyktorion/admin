"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  date: Date;
}

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', completed: true, date: new Date() },
    { id: '2', text: 'Review project requirements and specifications.', completed: true, date: new Date() },
    { id: '3', text: 'Update dashboard components with new features.', completed: false, date: new Date() },
    { id: '4', text: 'Test payment integration functionality.', completed: false, date: new Date() },
    { id: '5', text: 'Optimize database queries for better performance.', completed: false, date: new Date() },
    { id: '6', text: 'Create user documentation and guides.', completed: false, date: new Date() },
    { id: '7', text: 'Implement responsive design improvements.', completed: false, date: new Date() },
    { id: '8', text: 'Set up automated testing pipeline.', completed: false, date: new Date() },
    { id: '9', text: 'Review and merge pending pull requests.', completed: true, date: new Date() },
    { id: '10', text: 'Plan next sprint and assign tasks.', completed: true, date: new Date() },
    { id: '11', text: 'Update security configurations.', completed: true, date: new Date() },
    { id: '12', text: 'Backup database and test restore process.', completed: true, date: new Date() },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        date: date || new Date()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      setShowAddInput(false);
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">Todo List</h1>
        <Button
          size="sm"
          onClick={() => setShowAddInput(!showAddInput)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {showAddInput && (
          <div className="flex gap-2">
            <Input
              placeholder="Add new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1"
            />
            <Button onClick={addTodo} size="sm">
              Add
            </Button>
          </div>
        )}
      </div>

      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center gap-4 group">
                <Checkbox 
                  id={todo.id} 
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <label 
                  htmlFor={todo.id} 
                  className={`text-sm flex-1 cursor-pointer ${
                    todo.completed 
                      ? 'text-muted-foreground line-through' 
                      : 'text-foreground'
                  }`}
                >
                  {todo.text}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  ×
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
