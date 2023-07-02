import Image from "next/image";
import { useState } from "react";

export default function Characters({ characters, addCharacter }) {
  const handleCharacterClick = (character) => {
    addCharacter({
      name: character.name,
      type: character.type,
      id: character.id,
    });
  };
  const [tab, setTab] = useState(0);
  const onClickNew = (value) => {
    setTab(value);
  };
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "type") {
      setType(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addCharacter({
      name: name,
      type: type,
      id: Math.random(),
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        <ul className="flex">
          <li className="mr-3">
            <a
              className={
                tab === 0
                  ? "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
                  : "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
              }
              href="#"
              onClick={() => onClickNew(0)}
            >
              Gallery
            </a>
          </li>
          <li className="mr-3">
            <a
              className={
                tab === 0
                  ? "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
                  : "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
              }
              href="#"
              onClick={() => onClickNew(1)}
            >
              New Character
            </a>
          </li>
        </ul>
      </div>
      {tab === 0 ? (
        characters.map((character) => (
          <div
            key={character.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCharacterClick(character)}
          >
            <Image
              src={character.imageUrl}
              alt={character.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="mt-2">{character.name}</h2>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center col-span-3">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a type...</option>
                {[
                  "person",
                  "animal",
                  "dragon",
                  "unicorn",
                  "wizard",
                  "imaginary",
                  "prince",
                  "king",
                  "queen",
                  "princess",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
