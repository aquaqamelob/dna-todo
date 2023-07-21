import { useSession } from "next-auth/react";
import { api, RouterOutputs } from "~/lib/api";
import { Input } from "./ui/Input";
import { DeleteIcon, SendIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { cn } from "~/lib/utils";

export default function Todos() {
  const { data: sessionData } = useSession();
  const { data: todos, refetch: refetchTodos } = api.todo.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      void refetchTodos();
    },
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      void refetchTodos();
    },
  });

  const toggleTodo = api.todo.toggle.useMutation({
    onSuccess: () => {
      void refetchTodos();
    },
  });
  type Todo = RouterOutputs["todo"]["getAll"][0];

  const [inputValue, setInputValue] = useState<string>();
  const { toast } = useToast();
  return (
    <>
      <div className="space-y-4 pt-4">
        {sessionData?.user && todos
          ? todos.map((item: Todo) => (
              <div
                className={cn(
                  "flex w-80 justify-between gap-4 rounded-xl bg-white/10 p-4 text-white opacity-100 hover:bg-white/20",
                  item.isComplete && "opacity-40"
                )}
                key={item.id}
                onClick={() => {
                  toggleTodo.mutate({ id: item.id });
                }}
              >
                <h3 className="truncate text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>
                <Trash2Icon
                  onClick={() => deleteTodo.mutate({ id: item.id })}
                  className="cursor-pointer"
                />
              </div>
            ))
          : null}
      </div>
      {sessionData ? (
        <div className="fixed bottom-4 flex w-80 space-x-4">
          <Input
            placeholder="Study quantum computing..."
            className="rounded-xl backdrop-blur-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (todos!.length >= 5) {
                  toast({ title: "Cannot create more than 5 todos." });
                  return;
                }
                if (!inputValue) {
                  toast({ title: "Todo cannot be empty." });
                  return;
                }
                createTodo.mutate({
                  title: inputValue,
                });
                setInputValue("");
                toast({ title: "New todo added." });
              }
            }}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
          />
          <Button
            onClick={() => {
              if (todos!.length >= 5) {
                toast({ title: "Cannot create more than 5 todos." });
                return;
              }
              if (!inputValue) {
                toast({ title: "Todo cannot be empty." });
                return;
              }
              createTodo.mutate({
                title: inputValue,
              });
              setInputValue("");
              toast({ title: "New todo added." });
            }}
            className="rounded-xl bg-background/10 backdrop-blur-xl hover:bg-background/50 active:hover:bg-background"
          >
            Add
          </Button>
        </div>
      ) : null}
    </>
  );
}
