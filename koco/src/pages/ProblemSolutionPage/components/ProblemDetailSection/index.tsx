import { IGetProblemSolutionResponse } from '@/apis/problemApi';

const ProblemDetailSection = (data: IGetProblemSolutionResponse) => {
  return (
    <section className="p-6 sh">
      {/* 문제 제목 */}
      <h1 className="text-xl font-bold">
        {data?.problemNumber}번 {data.title}
      </h1>

      {/* 제한 조건 테이블 */}
      <table className="w-full mt-4 mb-6 text-sm border border-border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-border px-3 py-2">시간 제한</th>
            <th className="border-border px-3 py-2">메모리 제한</th>
            <th className="border-border px-3 py-2">제출</th>
            <th className="border-border px-3 py-2">정답</th>
            <th className="border-border px-3 py-2">맞힌 사람</th>
            <th className="border-border px-3 py-2">정답 비율</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border-border px-3 py-2">{data.timeLimit}</td>
            <td className="border-border px-3 py-2">{data.memoryLimit} MB</td>
            <td className="border-border px-3 py-2">{data.submissionCnt}</td>
            <td className="border-border px-3 py-2">{data.answerCnt}</td>
            <td className="border-border px-3 py-2">{data.answerCnt}</td>
            <td className="border-border px-3 py-2">{data.correctPplCnt}</td>
          </tr>
        </tbody>
      </table>

      {/* 문제 설명 */}
      <div className="mb-6 text-sm leading-relaxed text-gray-800">
        <h2 className="font-semibold text-base mb-2">문제</h2>
        <p>{data.description}</p>
      </div>

      {/* 입력 */}
      <div className="mb-6 text-sm leading-relaxed text-gray-800">
        <h2 className="font-semibold text-base mb-2">입력</h2>
        <p>{data.inputDescription}</p>
      </div>

      {/* 출력 */}
      <div className="mb-6 text-sm leading-relaxed text-gray-800">
        <h2 className="font-semibold text-base mb-2">출력</h2>
        <p>{data.outputDescription}</p>
      </div>

      {/* 예시 */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-semibold mb-1">예시 입력</h3>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-line">{data.inputExample}</pre>
        </div>
        <div>
          <h3 className="font-semibold mb-1">예시 출력</h3>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-line">{data.outputExample}</pre>
        </div>
      </div>
    </section>
  );
};

export default ProblemDetailSection;
