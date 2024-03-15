import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { createMatters } from "@/utils";
import { Box } from "@mui/material";
import { DateTimeFormatter, LocalDateTime } from "@js-joda/core";

type MyMatter = {
  title: string;
  date: LocalDateTime;
};

const dateTimeFormatter = DateTimeFormatter.ofPattern(`yyyy년 MM월 dd일`);

const LogsHomePage = async () => {
  const matters = await createMatters<MyMatter>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", width: "calc(100vw - 50px)" }}>
      {matters
        .sort((a, b) => a.date.compareTo(b.date))
        .map(({ path, title, summary, date }) => {
          return (
            <Card key={path} sx={{ minWidth: 500 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {summary}
                </Typography>
                <Typography variant="body2">{date.format(dateTimeFormatter)}</Typography>
              </CardContent>
              <CardActions>
                <Link href={`/logs/${path}`}>
                  <Button size="small">더 읽기</Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default LogsHomePage;
