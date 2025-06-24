import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Members = () => {
	const members = [
		{
			id: "1",
			name: "Alice Johnson",
			initials: "AJ",
		},
	];

	return (
		<div className="mt-auto flex w-80 flex-col">
			{members.map((member) => (
				<div
					key={member.id}
					className="flex h-24 items-center border-black border-r p-4 first:mt-15"
				>
					<div className="flex flex-1 items-center gap-3">
						<Avatar className="h-10 w-10">
							<AvatarFallback className="text-sm">
								{member.initials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<div className="mb-1 flex items-center gap-2">
								<p className="truncate font-medium text-sm">{member.name}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Members;
