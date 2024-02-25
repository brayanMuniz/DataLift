import React from 'react';

interface SelectExerciseProps {
    exerciseNames: string[];
    selectedExercise: string;
    onSelectExercise: (exerciseName: string) => void;
}

const SelectExercise: React.FC<SelectExerciseProps> = ({
    exerciseNames,
    selectedExercise,
    onSelectExercise,
}) => {
    return (
        <div>
            <select value={selectedExercise} onChange={(e) => onSelectExercise(e.target.value)}>
                {exerciseNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectExercise;
