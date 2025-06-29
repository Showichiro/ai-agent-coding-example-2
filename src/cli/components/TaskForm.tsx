import { Box, Text, useInput } from "ink";
import React, { useState } from "react";
import { Task, CreateTaskInput } from "../../core/domain/task";

interface TaskFormProps {
  mode: "create" | "edit";
  task?: Task;
  onSubmit: (input: CreateTaskInput) => void;
  onCancel: () => void;
}

export function TaskForm({ mode, task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
  );
  const [currentField, setCurrentField] = useState<
    "title" | "description" | "dueDate"
  >("title");
  const [inputMode, setInputMode] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const input: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    onSubmit(input);
  };

  useInput((input, key) => {
    if (inputMode) {
      if (key.return) {
        setInputMode(false);
        return;
      }

      if (key.backspace || key.delete) {
        if (currentField === "title") {
          setTitle((prev) => prev.slice(0, -1));
        } else if (currentField === "description") {
          setDescription((prev) => prev.slice(0, -1));
        } else if (currentField === "dueDate") {
          setDueDate((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (input && input.length === 1) {
        if (currentField === "title") {
          setTitle((prev) => prev + input);
        } else if (currentField === "description") {
          setDescription((prev) => prev + input);
        } else if (currentField === "dueDate") {
          setDueDate((prev) => prev + input);
        }
      }
      return;
    }

    if (key.tab) {
      if (currentField === "title") setCurrentField("description");
      else if (currentField === "description") setCurrentField("dueDate");
      else setCurrentField("title");
    }

    if (input === "e" || key.return) {
      setInputMode(true);
    }

    if (input === "s") {
      handleSubmit();
    }

    if (key.escape || input === "c") {
      onCancel();
    }
  });

  return (
    <Box flexDirection="column" padding={1} borderStyle="single">
      <Text bold>{mode === "create" ? "Create New Task" : "Edit Task"}</Text>

      <Box paddingTop={1}>
        <Box width={15}>
          <Text color={currentField === "title" ? "blue" : undefined}>
            Title:{" "}
          </Text>
        </Box>
        <Box flexGrow={1}>
          <Text
            color={inputMode && currentField === "title" ? "green" : undefined}
          >
            {title || "[Enter title]"}
            {inputMode && currentField === "title" && <Text>|</Text>}
          </Text>
        </Box>
      </Box>

      <Box>
        <Box width={15}>
          <Text color={currentField === "description" ? "blue" : undefined}>
            Description:{" "}
          </Text>
        </Box>
        <Box flexGrow={1}>
          <Text
            color={
              inputMode && currentField === "description" ? "green" : undefined
            }
          >
            {description || "[Optional]"}
            {inputMode && currentField === "description" && <Text>|</Text>}
          </Text>
        </Box>
      </Box>

      <Box>
        <Box width={15}>
          <Text color={currentField === "dueDate" ? "blue" : undefined}>
            Due Date:{" "}
          </Text>
        </Box>
        <Box flexGrow={1}>
          <Text
            color={
              inputMode && currentField === "dueDate" ? "green" : undefined
            }
          >
            {dueDate || "[YYYY-MM-DD]"}
            {inputMode && currentField === "dueDate" && <Text>|</Text>}
          </Text>
        </Box>
      </Box>

      <Box paddingTop={1}>
        <Text dimColor>
          {inputMode
            ? "[Enter] Confirm [Backspace] Delete"
            : "[Tab] Next [E] Edit [S] Submit [C] Cancel"}
        </Text>
      </Box>
    </Box>
  );
}
